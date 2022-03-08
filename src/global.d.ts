/// <reference types="@sveltejs/kit" />

interface Auth {
	id: string,
	discordId: string,
	name: string,
	avatar: string,
	moderator: boolean,
	admin: boolean,
	developer: boolean
}

declare namespace App {
	interface Session {
		auth: Auth | null
	}
	interface Locals {
		auth: Auth | null
	}
}