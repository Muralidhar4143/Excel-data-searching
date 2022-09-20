import styles from "./styles.module.css";
import Excel from "../Excel/excel"

const Main = () => {
	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};

	return (
		
		<div className={styles.main_container}>
			
			<nav className={styles.navbar}>
				<h1>Details</h1>
				<button className={styles.white_btn} onClick={handleLogout}>
					Logout
				</button>
			</nav><center>
			<Excel/>
			</center>
			


		</div>
	);
};

export default Main;