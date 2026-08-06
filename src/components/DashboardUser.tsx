import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../lib/firebase";

export default function DashboardUser() {
	const [email, setEmail] = useState("");
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (!user) {
				window.location.href = "/login";
				return;
			}

			setEmail(user.email ?? "Amic user");
			setLoading(false);
		});

		return () => unsubscribe();
	}, []);

	async function handleLogout() {
		await signOut(auth);
		window.location.href = "/login";
	}

	if (loading) {
		return <p>Loading account...</p>;
	}

	return (
		<div className="user-area">
			<div>
				<p className="signed-in-label">Signed in as</p>
				<strong>{email}</strong>
			</div>

			<button onClick={handleLogout}>
				Log out
			</button>
		</div>
	);
}
