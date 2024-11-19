type MediaSrc = Partial<{
  id: number;
  mediaName: string;
  mediaUrl: string;
}>;

export type ImageViewModalState = {
  open: boolean;
  mediaList: MediaSrc[];
  initialSlideIdx?: number;
  FooterComponent?: (currentMedia: MediaSrc) => JSX.Element;
};
