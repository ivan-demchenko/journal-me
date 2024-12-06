import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/login")({
	component: Login,
});

function Login() {
	return (
		<>
			<h1 className="page-title">Login</h1>
			<form method="POST">
				<label htmlFor="email">E-mail</label>
				<input
					type="email"
					id="email"
					name="email"
					placeholder="someone@something.com"
				/>

				<label htmlFor="password">Password</label>
				<input type="password" id="password" name="password" />

				<div>
					<button type="submit">Submit</button>
				</div>
			</form>
		</>
	);
}
