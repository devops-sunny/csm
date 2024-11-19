export type CloudinarySignature = {
  cloud_name: string;
  api_key: string;
  timestamp: number;
  signature: string;
  upload_preset: string;
};

export type CloudinaryUploadedResponse = {
  asset_id: string;
  public_id: string;
  version: number;
  version_id: string;
  signature: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  created_at: string;
  tags: string[];
  pages: number;
  bytes: number;
  type: string;
  etag: string;
  placeholder: boolean;
  url: string;
  secure_url: string;
  playback_url: string;
  asset_folder: string;
  display_name: string;
  access_mode: string;
  audio: {
    codec: string;
    bit_rate: string;
    frequency: number;
    channels: number;
    channel_layout: string;
  };
  video: {
    pix_format: string;
    codec: string;
    level: number;
    profile: string;
    bit_rate: string;
    dar: string;
    time_base: string;
  };
  is_audio: boolean;
  frame_rate: number;
  bit_rate: number;
  duration: number;
  rotation: number;
  original_filename: string;
  nb_frames: number;
  api_key: string;
};
