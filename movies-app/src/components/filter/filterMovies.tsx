import { useFilterGenres } from "@/hooks/useFilterGenres";
import { Autocomplete, TextField } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import React, { useState } from "react";
import "./filterMovies.scss";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useLocalStorageState } from "@toolpad/core";
import { IoIosArrowForward } from "react-icons/io";
import { useFilterOrder } from "@/hooks/useFilterOrder";

export default function FilterMovies() {
  const { genres = [], isLoading } = useFilterGenres();
  const { order = [] } = useFilterOrder();
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState<Dayjs | null>(dayjs());
  const [valueText, setValueText] = useLocalStorageState(
    "string-value",
    "Initial Value"
  );

  const toggleFilter = () => {
    setIsOpen(!isOpen);
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
              renderInput={(params) => (
                <TextField {...params} label="Ordenar por" />
              )}
            />
          </div>
          <div className="filter-content-datePicker-container">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="De"
                value={null}
                onChange={(newValue) => setValue(newValue)}
                sx={{ width: "100%" }}
              />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                defaultValue={dayjs().startOf("day")}
                format="DD/MM/YYYY"
                label="Até"
                onChange={(newValue) => setValue(newValue)}
                sx={{ width: "100%" }}
              />
            </LocalizationProvider>
          </div>
          <div className="filter-content-inputText-container">
            <Stack direction="row" spacing={1} width="100%">
              <TextField
                value={valueText}
                onChange={(event) => setValueText(event.target.value)}
                placeholder="Pesquise por filmes"
                sx={{ flex: 1 }}
              />
              <Button onClick={() => setValueText("")}>Limpar</Button>
            </Stack>
          </div>
          <div className="filter-content-buttonSearch-container">
            <Button variant="contained" disableElevation>
              Pesquisar
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
