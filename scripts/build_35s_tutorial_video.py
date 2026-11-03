import subprocess
import os

video_in = r"temp_30s\raw\fast-raw.webm"
audio_dir = r"temp_30s\audio"
output_dir = r"assets\videos"
output_mp4 = os.path.join(output_dir, "pulp-riot-tutorial.mp4")

os.makedirs(output_dir, exist_ok=True)

# Audio filter to position each speech stem and mix them together
audio_filter = (
    "[1:a]adelay=600|600[a1];"
    "[2:a]adelay=7800|7800[a2];"
    "[3:a]adelay=16000|16000[a3];"
    "[4:a]adelay=25500|25500[a4];"
    "[a1][a2][a3][a4]amix=inputs=4:duration=longest:dropout_transition=2[voice];"
    "[voice]volume=1.5[aout]"
)

# Video filter for chapter lower-third banners with brutalist typography
font_path = "temp_30s/font.ttf"

video_filter = (
    # Part 1: 0.6s - 7.5s
    f"drawtext=fontfile='{font_path}':text='PULP RIOT // 12-TON HYDRAULIC COLD-PRESS':"
    "x=48:y=48:fontsize=28:fontcolor=white:box=1:boxcolor=black@0.9:boxborderw=12:"
    "enable='between(t,0.6,7.5)',"

    # Part 2: 7.8s - 15.8s
    f"drawtext=fontfile='{font_path}':text='FLAVOR VOLTAGE // DYNAMIC ACID-POP RE-THEMES':"
    "x=48:y=48:fontsize=28:fontcolor=white:box=1:boxcolor=0xff0077@0.95:boxborderw=12:"
    "enable='between(t,7.8,15.8)',"

    # Part 3: 16.0s - 25.2s
    f"drawtext=fontfile='{font_path}':text='HYDRAULIC MIX LAB // 2D CANVAS FLUID PHYSICS':"
    "x=48:y=48:fontsize=28:fontcolor=black:box=1:boxcolor=0xccff00@0.95:boxborderw=12:"
    "enable='between(t,16.0,25.2)',"

    # Part 4: 25.5s - 35.5s
    f"drawtext=fontfile='{font_path}':text='CRATE DISCOUNTS & WHOLESALE MANIFEST APPROVED':"
    "x=48:y=48:fontsize=28:fontcolor=white:box=1:boxcolor=0xff1100@0.95:boxborderw=12:"
    "enable='between(t,25.5,35.5)'"
)

cmd = [
    "ffmpeg", "-y",
    "-i", video_in,
    "-i", os.path.join(audio_dir, "v1.mp3"),
    "-i", os.path.join(audio_dir, "v2.mp3"),
    "-i", os.path.join(audio_dir, "v3.mp3"),
    "-i", os.path.join(audio_dir, "v4.mp3"),
    "-filter_complex", f"{audio_filter};[0:v]{video_filter}[vout]",
    "-map", "[vout]",
    "-map", "[aout]",
    "-c:v", "libx264",
    "-preset", "fast",
    "-pix_fmt", "yuv420p",
    "-crf", "18",
    "-c:a", "aac",
    "-b:a", "192k",
    "-t", "35.5",
    output_mp4
]

print("Assembling fast 35.5s tutorial video with voiceover...")
subprocess.run(cmd, check=True)
print(f"Video ready: {output_mp4}")
