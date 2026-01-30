# Copy images from _posts directory to _site to make them accessible
Jekyll::Hooks.register :site, :post_write do |site|
  # Find all image files in _posts directory
  posts_dir = site.source + '/_posts'
  
  Dir.glob(File.join(posts_dir, '**', 'images', '*')).each do |image_path|
    # Get relative path from _posts directory
    relative_path = image_path.sub(posts_dir + '/', '')
    
    # Determine destination path in _site
    dest_path = File.join(site.dest, relative_path)
    
    # Create destination directory if it doesn't exist
    FileUtils.mkdir_p(File.dirname(dest_path))
    
    # Copy the image file
    FileUtils.cp(image_path, dest_path)
    
    puts "Copied image: #{relative_path}"
  end
end
