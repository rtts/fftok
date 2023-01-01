#!/bin/bash -e
usage() {
    cat <<EOF

Concatenate ts files

Synopsis:
    $(basename $0) [INPUT_FILES] OUTPUT_FILE

EOF
    exit 1
}

if [[ $# -lt 2 ]]
then
   usage
fi

join() {
    while [[ $# -gt 2 ]]
    do
        echo -n "$1|"
        shift
    done
    echo -n "$1"
}

output="${@: -1}"

ffmpeg \
    -i "concat:$(join "$@")" \
    -muxdelay 0 \
    -c:v copy \
    -c:a copy \
    "$output"

# Loop the video
ffplay -loop 0 "$output"
