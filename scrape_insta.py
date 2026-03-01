import instaloader
import sys
import os
import shutil

def download_images(username, limit=12):
    print(f"Initializing Instaloader for {username}...")
    
    # Target directory
    target_dir = f"public/instagram"
    if not os.path.exists(target_dir):
        os.makedirs(target_dir)
        
    L = instaloader.Instaloader(
        download_videos=False,
        download_video_thumbnails=False,
        download_geotags=False,
        download_comments=False,
        save_metadata=False,
        compress_json=False,
        dirname_pattern=target_dir
    )

    try:
        profile = instaloader.Profile.from_username(L.context, username)
        count = 0
        for post in profile.get_posts():
            if post.is_video:
                continue
            if count >= limit:
                break
            print(f"Downloading post {post.shortcode}...")
            L.download_post(post, target=target_dir)
            count += 1
            
        # Clean up unwanted txt files that instaloader might leave behind
        for f in os.listdir(target_dir):
            if f.endswith(".txt") or f.endswith(".json.xz") or f.endswith(".json"):
                os.remove(os.path.join(target_dir, f))
                
        print(f"Successfully downloaded recent images to {target_dir}!")
    except Exception as e:
        print(f"Failed to download from {username}: {e}")

if __name__ == "__main__":
    target = sys.argv[1] if len(sys.argv) > 1 else "womania"
    download_images(target, 12)
