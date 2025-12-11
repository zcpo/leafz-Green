export interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  isAdmin?: boolean;
}

export interface State {
  id: string;
  name: string;
}

export interface City {
  id: string;
  name: string;
  stateId: string;
}

export interface Dispensary {
  id: string;
  name: string;
  address: string;
  cityId: string;
  stateId: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  imageUrl: string;
  imageHint: string;
  rating: number;
  reviewCount: number;
}

export interface Review {
  id: string;
  dispensaryId: string;
  userId: string;
  userName: string;
  userPhotoUrl?: string;
  rating: number;
  text: string;
  createdAt: Date;
  photoUrl?: string;
  photoHint?: string;
}
