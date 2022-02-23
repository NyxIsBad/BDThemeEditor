/// <reference types="@sveltejs/kit" />

declare namespace App {
	interface Session {
		auth: {
			id: string,
			discordId: string,
			name: string,
			avatar: string,
			moderator: boolean,
			admin: boolean,
			developer: boolean
		} | null
	}
}