export interface Project {
  id: number;
  title: string;
  summary: string;
  stack: string;
  category: string;
  /** Thumbnail. Omit to fall back to a generated monogram tile. */
  image?: string;
  /**
   * How the thumbnail fills its 16:9 slot. Screenshots and photos want the
   * default `cover`; logos want `contain`, which pads them on a white plate
   * instead of cropping a circular mark to a rectangle.
   */
  imageFit?: "cover" | "contain";
  /** Public GitHub repository, for personal and open work. */
  repo?: string;
  /** Deployed site. Takes precedence over `repo` as the row's link. */
  liveUrl?: string;
  /** Employer or client, for professional work that has no public repo. */
  org?: string;
}
