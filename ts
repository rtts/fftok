#!/bin/bash -e
usage() {
    cat <<EOF

TimeStamp - Specify a list of timestamps at which to cut video

Synopsis:
    $(basename $0) INPUT_FILE [even number of timestamps] OUTPUT_FILE

EOF
    exit 1
}

call() {
    echo "Executing: $@"
    "$@"
}

join() {
    while [[ $# -gt 1 ]]
    do
        echo -n "$1|"
        shift
    done
    echo -n "$1"
}

if ls *.ts 2> /dev/null
then
    echo "Cleanup your mess!"
    exit 1
fi

if [[ $# -lt 4 ]]
then
    echo "Not enough arguments."
    exit 1
fi

if [[ !$(($#%2)) -eq 0 ]]
then
    echo "Uneven number of timestamps."
    exit 1
fi

input="$1"
shift

# Create an intermediate TS file for each fragment
fragment=1
while [[ $# -ne 1 ]]
do
    from=$1
    to=$2
    shift
    shift
    # Call ffmpeg
    call ffmpeg \
         -fflags +genpts \
         -ss "$from" \
         -i "$input" \
         -ss "$from" \
         -to "$to" \
         -copyts \
         -c:v copy \
         -c:a copy \
         "$fragment.ts"
    touch $fragment.ts
    ((fragment++))
done

output="$1"

# Join all fragments to a single output file
call ffmpeg \
     -i "concat:$(join $(ls *.ts))" \
     -c:v copy \
     -c:a copy \
     "$output"

# Delete intermediary files
rm *.ts

# Loop the video
ffplay -loop 0 "$output"
