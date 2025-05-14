export interface Vehicle {
  id: string;
  attributes: {
    label: string;
    current_status: string;
    latitude: number;
    longitude: number;
    updated_at: string;
  };
  relationships: {
    route: { data: { id: string } };
    trip: { data: { id: string } };
  };
}

export interface Route {
  id: string;
  attributes: {
    long_name: string;
  };
}

export interface Trip {
  id: string;
  attributes: {
    name: string;
  };
}
