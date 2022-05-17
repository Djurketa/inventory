import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import BarChartIcon from "@mui/icons-material/BarChart";
import CalculateIcon from "@mui/icons-material/Calculate";
import DescriptionIcon from "@mui/icons-material/Description";
import ViewListIcon from "@mui/icons-material/ViewList";
import AirportShuttleIcon from "@mui/icons-material/AirportShuttle";
import SettingsIcon from "@mui/icons-material/Settings";
import CloudSyncIcon from "@mui/icons-material/CloudSync";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";

export const mainListItems = (
	<React.Fragment>
		<ListItemButton component={Link} to="/portal">
			<ListItemIcon>
				<DashboardIcon />
			</ListItemIcon>
			<ListItemText primary="Portal" />
		</ListItemButton>
		<ListItemButton component={Link} to="/narudzbenice">
			<ListItemIcon>
				<CalculateIcon />
			</ListItemIcon>
			<ListItemText primary="Narudžbenice" />
		</ListItemButton>
		<ListItemButton component={Link} to="/fakture">
			<ListItemIcon>
				<DescriptionIcon />
			</ListItemIcon>
			<ListItemText primary="Fakture" />
		</ListItemButton>
		<ListItemButton component={Link} to="/izvjestaji">
			<ListItemIcon>
				<BarChartIcon />
			</ListItemIcon>
			<ListItemText primary="Izvještaji" />
		</ListItemButton>
		<ListItemButton component={Link} to="/sifrarnici">
			<ListItemIcon>
				<ViewListIcon />
			</ListItemIcon>
			<ListItemText primary="Šifrarnici" />
		</ListItemButton>
	</React.Fragment>
);

export const secondaryListItems = (
	<React.Fragment>
		<ListSubheader component="div" inset>
			Saved reports
		</ListSubheader>
		<ListItemButton component={Link} to="/dobavljaci">
			<ListItemIcon>
				<AirportShuttleIcon />
			</ListItemIcon>
			<ListItemText primary="Unos dobavljača" />
		</ListItemButton>
		<ListItemButton component={Link} to="/artikli">
			<ListItemIcon>
				<CloudSyncIcon />
			</ListItemIcon>
			<ListItemText primary="Mapiranje artikala" />
		</ListItemButton>
		<ListItemButton component={Link} to="/podesavanja">
			<ListItemIcon>
				<SettingsIcon />
			</ListItemIcon>
			<ListItemText primary="Podešavanja" />
		</ListItemButton>
		<ListItemButton
			component={Link}
			to=""
			onClick={() => {
				sessionStorage.clear();
				window.location.reload();
			}}>
			<ListItemIcon>
				<LogoutIcon />
			</ListItemIcon>
			<ListItemText primary="Odjava" />
		</ListItemButton>
	</React.Fragment>
);
