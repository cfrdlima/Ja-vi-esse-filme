import { useFilterGenres } from "@/hooks/useFilterGenres";
import { Autocomplete, TextField } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import React, { useState } from "react";
import "./filterMovies.scss";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Button from "@mui/material/Button";
import { IoIosArrowForward } from "react-icons/io";
import { useFilterOrder } from "@/hooks/useFilterOrder";

export default function FilterMovies({ onSearch }: FilterMoviesProps) {
  const { genres = [] } = useFilterGenres();
  const { order = [] } = useFilterOrder();
  const [isOpen, setIsOpen] = useState(false);
  const [valueFrom, setValueFrom] = useState<Dayjs | null>(null);
  const [selectedGenre, setSelectedGenre] = useState<any>(null);
  const [search, setSearch] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const toggleFilter = () => {
    setIsOpen(!isOpen);
  };

  const handleSearch = () => {
    const searchParams = {
      genre: selectedGenre,
      order: selectedOrder,
      startDate: valueFrom ? valueFrom.format("YYYY") : null,
      searchMovie: search,
    };
    onSearch(searchParams);
  };

  return (
    <div className={`filter-container ${isOpen ? "open" : ""}`}>
      <div className="filter-header" onClick={toggleFilter}>
        <h3>Filtros</h3>
        <IoIosArrowForward className="homePage-iconArrow" />
      </div>
      {isOpen && (
        <div className="filter-content-container">
          <div className="filter-content-combo">
            <Autocomplete
              className="filter-combobox"
              disablePortal
              id="combo-box-genre"
              options={genres}
              getOptionLabel={(option) => option.name || ""}
              sx={{ width: "100%" }}
              onChange={(event, newValue) => setSelectedGenre(newValue)}
              renderInput={(params) => <TextField {...params} label="Gênero" />}
            />
          </div>
          <div className="filter-content-combo">
            <Autocomplete
              className="filter-combobox"
              disablePortal
              id="combo-box-sort"
              options={order}
              getOptionLabel={(option) => option.label || ""}
              sx={{ width: "100%" }}
              onChange={(event, newValue) => setSelectedOrder(newValue)}
              renderInput={(params) => (
                <TextField {...params} label="Ordenar por" />
              )}
            />
          </div>
          <div className="filter-content-datePicker-container">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Ano de Lançamento"
                onChange={(newValue) => setValueFrom(newValue)}
                format="YYYY"
              />
            </LocalizationProvider>
          </div>
          <div className="filter-content-movieByName">
            <TextField
              id="outlined-basic"
              label="Buscar por series"
              variant="outlined"
              className="formSubmit-text"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />
          </div>
          <div className="filter-content-buttonSearch-container">
            <Button variant="contained" disableElevation onClick={handleSearch}>
              Pesquisar
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
