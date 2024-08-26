interface FilterMoviesProps {
  onSearch: (filters: {
    genre: any;
    order: any;
    startDate: string | null;
    searchMovie: string | "",
  }) => void;
}