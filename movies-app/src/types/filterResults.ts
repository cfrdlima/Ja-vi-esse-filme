interface FilterMoviesProps {
  onSearch: (filters: {
    genre: any;
    order: any;
    startDate: string | null;
    endDate: string | null;
    searchText: string;
  }) => void;
}