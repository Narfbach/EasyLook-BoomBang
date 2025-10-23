from PIL import Image, ImageDraw, ImageFont
import os
import urllib.request

print("Creating Easy Look logo...")

# Create canvas with transparency
width, height = 400, 100
img = Image.new('RGBA', (width, height), (0, 0, 0, 0))
draw = ImageDraw.Draw(img)

# Color - white for dark theme
text_color = (255, 255, 255, 255)

# Download and use Poppins font
font_path = 'Poppins-SemiBold.ttf'

if not os.path.exists(font_path):
    print("Downloading Poppins font...")
    try:
        url = 'https://github.com/google/fonts/raw/main/ofl/poppins/Poppins-SemiBold.ttf'
        urllib.request.urlretrieve(url, font_path)
        print("Font downloaded successfully!")
    except Exception as e:
        print(f"Could not download font: {e}")
        print("Using system font instead...")
        font_path = None

# Load font
try:
    if font_path and os.path.exists(font_path):
        font_easy = ImageFont.truetype(font_path, 50)
        font_look = ImageFont.truetype(font_path, 50)
        print(f"Using Poppins font")
    else:
        # Fallback to best available system font
        font_paths = [
            "C:/Windows/Fonts/segoeuib.ttf",  # Segoe UI Bold
            "C:/Windows/Fonts/calibrib.ttf",   # Calibri Bold
            "C:/Windows/Fonts/arialbd.ttf",    # Arial Bold
        ]
        font_easy = None
        for path in font_paths:
            if os.path.exists(path):
                font_easy = ImageFont.truetype(path, 50)
                font_look = ImageFont.truetype(path, 50)
                print(f"Using font: {path}")
                break
        
        if font_easy is None:
            font_easy = ImageFont.load_default()
            font_look = ImageFont.load_default()
except Exception as e:
    print(f"Font error: {e}")
    font_easy = ImageFont.load_default()
    font_look = ImageFont.load_default()

# Create the full text "Easy Look" to calculate centering
full_text = "Easy Look"

try:
    # Get bounding box for full text
    full_bbox = draw.textbbox((0, 0), full_text, font=font_easy)
    full_width = full_bbox[2] - full_bbox[0]
    full_height = full_bbox[3] - full_bbox[1]
    
    # Get individual text widths
    easy_bbox = draw.textbbox((0, 0), "Easy", font=font_easy)
    easy_width = easy_bbox[2] - easy_bbox[0]
    
    look_bbox = draw.textbbox((0, 0), "Look", font=font_look)
    look_width = look_bbox[2] - look_bbox[0]
except:
    full_width = 300
    easy_width = 140
    look_width = 140
    full_height = 50

# Center the entire text block
start_x = (width - full_width) // 2
text_y = (height - full_height) // 2

# Draw "Easy"
easy_x = start_x
draw.text((easy_x, text_y), "Easy", font=font_easy, fill=text_color)

# Draw "Look" with a small space
space_width = 15
look_x = easy_x + easy_width + space_width
draw.text((look_x, text_y), "Look", font=font_look, fill=text_color)

# Ensure public directory exists
os.makedirs('boombang-palette-app/public', exist_ok=True)

# Save
output_path = 'boombang-palette-app/public/logo.png'
img.save(output_path, 'PNG')
print("[OK] Logo created successfully!")
print(f"  Saved to: {output_path}")
print(f"  Size: {width}x{height} pixels")
