/**
 * File Service
 * Handles validation and management of external URLs for videos and documents
 */

class FileService {
  /**
   * Validate external file URL
   * @param {string} url - The URL to validate
   * @returns {boolean} - True if valid URL
   */
  static validateFileUrl(url) {
    if (!url || typeof url !== 'string') {
      return false;
    }

    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Validate YouTube URL
   * @param {string} url - The YouTube URL to validate
   * @returns {boolean} - True if valid YouTube URL
   */
  static validateVideoUrl(url) {
    if (!url || typeof url !== 'string') {
      return false;
    }

    // Check if it's a valid URL first
    if (!this.validateFileUrl(url)) {
      return false;
    }

    // Check if it's a YouTube URL
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube|youtu|youtube-nocookie)\.(com|be)\//;
    return youtubeRegex.test(url);
  }

  /**
   * Extract YouTube video ID from URL
   * @param {string} url - The YouTube URL
   * @returns {string|null} - The video ID or null if not found
   */
  static extractVideoId(url) {
    if (!url || typeof url !== 'string') {
      return null;
    }

    // Handle different YouTube URL formats
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
      /youtube\.com\/watch\?.*v=([^&\n?#]+)/,
      /youtu\.be\/([^&\n?#]+)/,
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1]) {
        return match[1];
      }
    }

    return null;
  }

  /**
   * Get YouTube thumbnail URL from video ID
   * @param {string} videoId - The YouTube video ID
   * @returns {string} - The thumbnail URL
   */
  static getYoutubeThumbnail(videoId) {
    if (!videoId || typeof videoId !== 'string') {
      return null;
    }

    // Return the high quality thumbnail URL
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  }

  /**
   * Validate file size (in bytes)
   * @param {number} fileSize - The file size in bytes
   * @param {number} maxSize - The maximum allowed size in bytes (default: 50MB)
   * @returns {boolean} - True if file size is valid
   */
  static validateFileSize(fileSize, maxSize = 50 * 1024 * 1024) {
    if (typeof fileSize !== 'number' || fileSize <= 0) {
      return false;
    }

    return fileSize <= maxSize;
  }

  /**
   * Validate MIME type
   * @param {string} mimeType - The MIME type to validate
   * @returns {boolean} - True if MIME type is valid
   */
  static validateMimeType(mimeType) {
    const allowedMimeTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-powerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'text/plain',
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/webp',
    ];

    return allowedMimeTypes.includes(mimeType);
  }

  /**
   * Delete file reference (placeholder for future implementation)
   * @param {string} url - The file URL
   * @returns {Promise<boolean>} - True if deletion was successful
   */
  static async deleteFile(url) {
    // This is a placeholder for future implementation
    // In a real scenario, this might remove files from cloud storage
    if (!url || typeof url !== 'string') {
      return false;
    }

    // For now, just return true as we're only storing URLs
    return true;
  }

  /**
   * Get file extension from URL
   * @param {string} url - The file URL
   * @returns {string|null} - The file extension or null
   */
  static getFileExtension(url) {
    if (!url || typeof url !== 'string') {
      return null;
    }

    try {
      const urlObj = new URL(url);
      const pathname = urlObj.pathname;
      const extension = pathname.substring(pathname.lastIndexOf('.') + 1).toLowerCase();
      return extension || null;
    } catch (error) {
      return null;
    }
  }

  /**
   * Get file name from URL
   * @param {string} url - The file URL
   * @returns {string|null} - The file name or null
   */
  static getFileName(url) {
    if (!url || typeof url !== 'string') {
      return null;
    }

    try {
      const urlObj = new URL(url);
      const pathname = urlObj.pathname;
      return pathname.substring(pathname.lastIndexOf('/') + 1) || null;
    } catch (error) {
      return null;
    }
  }
}

module.exports = FileService;
