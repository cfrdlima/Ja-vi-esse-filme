interface FilterMoviesProps {
  onSearch: (filters: {
    genre: any;
    order: any;
    startDate: string | null;
    searchText: string;
  }) => void;
}