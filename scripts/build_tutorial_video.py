import subprocess
import os

video_in = r"temp_tutorial\raw\tutorial-raw.webm"
audio_dir = r"temp_tutorial\audio"
output_dir = r"assets\videos"
output_mp4 = os.path.join(output_dir, "pulp-riot-tutorial.mp4")

os.makedirs(output_dir, exist_ok=True)

# Timings for chapters (in seconds)
# scene1: delay 0.8s (800ms)
# scene2: delay 12.0s (12000ms)
# scene3: delay 24.0s (24000ms)
# scene4: delay 39.5s (39500ms)
# scene5: delay 49.0s (49000ms)

# Audio filter to position each speech stem and mix them together
audio_filter = (
    "[1:a]adelay=800|800[a1];"
    "[2:a]adelay=12000|12000[a2];"
    "[3:a]adelay=24000|24000[a3];"
    "[4:a]adelay=39500|39500[a4];"
    "[5:a]adelay=49000|49000[a5];"
    "[a1][a2][a3][a4][a5]amix=inputs=5:duration=longest:dropout_transition=2[voice];"
    "[voice]volume=1.4[aout]"
)

# Video filter for chapter lower-third banners with brutalist typography
font_path = "temp_tutorial/font.ttf"

video_filter = (
    # Chapter 1: 0.8s - 11.5s
    f"drawtext=fontfile='{font_path}':text='CHAPTER 01 // HERO FLAVOR DETONATION':"
    "x=48:y=48:fontsize=28:fontcolor=white:box=1:boxcolor=black@0.9:boxborderw=12:"
    "enable='between(t,0.8,11.5)',"

    # Chapter 2: 12.0s - 23.5s
    f"drawtext=fontfile='{font_path}':text='CHAPTER 02 // VOLTAGE FLAVOR MATRIX':"
    "x=48:y=48:fontsize=28:fontcolor=white:box=1:boxcolor=0xff0077@0.95:boxborderw=12:"
    "enable='between(t,12.0,23.5)',"

    # Chapter 3: 24.0s - 39.0s
    f"drawtext=fontfile='{font_path}':text='CHAPTER 03 // HYDRAULIC MIX LAB BLENDER':"
    "x=48:y=48:fontsize=28:fontcolor=black:box=1:boxcolor=0xccff00@0.95:boxborderw=12:"
    "enable='between(t,24.0,39.0)',"

    # Chapter 4: 39.5s - 48.5s
    f"drawtext=fontfile='{font_path}':text='CHAPTER 04 // SYNDICATE CRATE BUILDER (15 PCT OFF)':"
    "x=48:y=48:fontsize=28:fontcolor=white:box=1:boxcolor=0x0066ff@0.95:boxborderw=12:"
    "enable='between(t,39.5,48.5)',"

    # Chapter 5: 49.0s - 72.0s
    f"drawtext=fontfile='{font_path}':text='CHAPTER 05 // WHOLESALE CUSTOMS MANIFEST':"
    "x=48:y=48:fontsize=28:fontcolor=white:box=1:boxcolor=0xff1100@0.95:boxborderw=12:"
    "enable='between(t,49.0,72.0)'"
)

cmd = [
    "ffmpeg", "-y",
    "-i", video_in,
    "-i", os.path.join(audio_dir, "scene1.mp3"),
    "-i", os.path.join(audio_dir, "scene2.mp3"),
    "-i", os.path.join(audio_dir, "scene3.mp3"),
    "-i", os.path.join(audio_dir, "scene4.mp3"),
    "-i", os.path.join(audio_dir, "scene5.mp3"),
    "-filter_complex", f"{audio_filter};[0:v]{video_filter}[vout]",
    "-map", "[vout]",
    "-map", "[aout]",
    "-c:v", "libx264",
    "-preset", "fast",
    "-pix_fmt", "yuv420p",
    "-crf", "18",
    "-c:a", "aac",
    "-b:a", "192k",
    "-t", "72",
    output_mp4
]

print("Assembling final tutorial video with voiceover...")
subprocess.run(cmd, check=True)
print(f"Tutorial video successfully generated: {output_mp4}")
