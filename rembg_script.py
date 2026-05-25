from rembg import remove
from PIL import Image
import os

images_to_process = [
    (r"C:\Users\satwi\.gemini\antigravity\brain\95f141f7-4716-4d4f-96df-60b71673dc66\new_avatar_wink_1779734038202.png", "new_avatar_wink.png"),
    (r"C:\Users\satwi\.gemini\antigravity\brain\95f141f7-4716-4d4f-96df-60b71673dc66\new_avatar_surprised_1779734051630.png", "new_avatar_surprised.png"),
    (r"C:\Users\satwi\.gemini\antigravity\brain\95f141f7-4716-4d4f-96df-60b71673dc66\media__1779732448948.jpg", "new_avatar_happy.png"),
    (r"C:\Users\satwi\.gemini\antigravity\brain\95f141f7-4716-4d4f-96df-60b71673dc66\new_avatar_shy_1779732560591.png", "new_avatar_shy.png"),
    (r"C:\Users\satwi\.gemini\antigravity\brain\95f141f7-4716-4d4f-96df-60b71673dc66\new_avatar_heart_1779732581699.png", "new_avatar_heart.png"),
    (r"C:\Users\satwi\.gemini\antigravity\brain\95f141f7-4716-4d4f-96df-60b71673dc66\female_avatar_1779733446849.png", "female_avatar.png")
]

for in_path, out_path in images_to_process:
    if os.path.exists(in_path):
        print(f"Processing {out_path}...")
        img = Image.open(in_path)
        out = remove(img)
        out.save(out_path)
        print(f"Saved {out_path}")
    else:
        print(f"File not found: {in_path}")

print("Done.")
