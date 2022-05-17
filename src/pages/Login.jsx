import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

function Copyright(props) {
	return (
		<Typography
			variant="body2"
			color="text.secondary"
			align="center"
			{...props}>
			{"Copyright © "}
			<Link color="inherit" href="https://mui.com/">
				Your Website
			</Link>{" "}
			{new Date().getFullYear()}
			{"."}
		</Typography>
	);
}

const theme = createTheme();

export default function SignIn() {
	const navigate = useNavigate();

	const handleSubmit = (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		sessionStorage.setItem(
			"token",
			data.get("username") + data.get("password")
		);
		window.location.reload();
		// console.log({
		// 	username: data.get("username"),
		// 	password: data.get("password"),
		// });
	};

	return (
		<ThemeProvider theme={theme}>
			<Box
				sx={{
					height: "100vh",
					width: "100vw",
					bgcolor: "black",
					p: "200px",
					backgroundImage:
						"url(https://img.freepik.com/free-photo/digital-world-map-hologram-blue-background_1379-900.jpg?w=2000)",
					backgroundRepeat: "no-repeat",
					backgroundColor: (t) =>
						t.palette.mode === "light"
							? t.palette.grey[50]
							: t.palette.grey[900],
					backgroundSize: "cover",
					backgroundPosition: "center",
				}}>
				<Container component="main" maxWidth="xs">
					<CssBaseline />
					<Box
						sx={{
							p: 10,
							width: "500px",
							bgcolor: "white",
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							position: "absolute",
							top: "50%",
							left: "50%",
							transform: "translate(-50%,-50%)",
						}}>
						<Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
							<LockOutlinedIcon />
						</Avatar>
						<Typography component="h1" variant="h5">
							Prijava
						</Typography>
						<Box
							component="form"
							onSubmit={handleSubmit}
							noValidate
							sx={{ mt: 1 }}>
							<TextField
								margin="normal"
								required
								fullWidth
								id="username"
								label="Korisničko ime"
								name="username"
								autoComplete="username"
								autoFocus
							/>
							<TextField
								margin="normal"
								required
								fullWidth
								name="password"
								label="Lozinka"
								type="password"
								id="password"
								autoComplete="current-password"
							/>
							<FormControlLabel
								control={<Checkbox value="remember" color="primary" />}
								label="Remember me"
							/>
							<Button
								type="submit"
								fullWidth
								variant="contained"
								sx={{ mt: 3, mb: 2 }}>
								Prijavi se
							</Button>
							<Grid container>
								<Grid item xs>
									<Link href="#" variant="body2">
										Zaboravili ste lozinku?
									</Link>
								</Grid>
								<Grid item>
									<Link href="#" variant="body2">
										{"Registracija!"}
									</Link>
								</Grid>
							</Grid>
						</Box>
					</Box>
					<Copyright sx={{ mt: 8, mb: 4 }} />
				</Container>
			</Box>
		</ThemeProvider>
	);
}
