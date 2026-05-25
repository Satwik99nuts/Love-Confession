from PIL import Image

def remove_white_bg(input_path, output_path, threshold=225):
    try:
        img = Image.open(input_path).convert("RGBA")
        data = img.getdata()

        newData = []
        for item in data:
            if item[0] > threshold and item[1] > threshold and item[2] > threshold:
                newData.append((255, 255, 255, 0))
            else:
                newData.append(item)

        img.putdata(newData)
        img.save(output_path, "PNG")
        print(f"Processed: {output_path}")
    except Exception as e:
        print(f"Failed to process {input_path}: {e}")

images_to_process = [
    (r"C:\Users\satwi\.gemini\antigravity\brain\95f141f7-4716-4d4f-96df-60b71673dc66\new_avatar_wink_1779734038202.png", "new_avatar_wink.png"),
    (r"C:\Users\satwi\.gemini\antigravity\brain\95f141f7-4716-4d4f-96df-60b71673dc66\new_avatar_surprised_1779734051630.png", "new_avatar_surprised.png"),
    (r"C:\Users\satwi\.gemini\antigravity\brain\95f141f7-4716-4d4f-96df-60b71673dc66\media__1779732448948.jpg", "new_avatar_happy.png"),
    (r"C:\Users\satwi\.gemini\antigravity\brain\95f141f7-4716-4d4f-96df-60b71673dc66\new_avatar_shy_1779732560591.png", "new_avatar_shy.png"),
    (r"C:\Users\satwi\.gemini\antigravity\brain\95f141f7-4716-4d4f-96df-60b71673dc66\new_avatar_heart_1779732581699.png", "new_avatar_heart.png"),
    (r"C:\Users\satwi\.gemini\antigravity\brain\95f141f7-4716-4d4f-96df-60b71673dc66\female_avatar_1779733446849.png", "female_avatar.png")
]

for in_path, out_path in images_to_process:
    remove_white_bg(in_path, out_path)
