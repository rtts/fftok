#!/bin/bash -e
usage() {
    cat <<EOF

Cut video into intermediary ts files

Synopsis:
    $(basename $0) INPUT_FILE [even number of timestamps]

EOF
    exit 1
}

if [[ $# -lt 3 ]]
then
    usage
fi

if [[ !$(($#%2)) -eq 1 ]]
then
    echo "Uneven number of timestamps."
    exit 1
fi

input="$1"
output="${1%.*}"
fragment=1
join=()

shift
while [[ $# -ne 0 ]]
do
    from="$1"
    to="$2"
    join+=("$output.$fragment.ts")
    shift
    shift
    ffmpeg \
        -fflags +genpts+igndts \
        -ss "$from" \
        -i "$input" \
        -ss "$from" \
        -to "$to" \
        -copyts \
        -c:v libx264 \
        -preset ultrafast \
        -c:a copy \
        "$output.$fragment.ts"
    ((fragment++))
done

if [[ ${#join[@]} -eq 1 ]]
then
    mv "${join[@]}" "$output.ts"
    ffplay -loop 0 "$output.ts"
else
    cc1 "${join[@]}" "$output.ts"
fi
