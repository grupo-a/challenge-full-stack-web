import { compare, hash } from "bcryptjs"

export class HashProvider {
	public static generateHash(payload: string): Promise<string> {
		return hash(payload, 8)
	}

	public static compareHash(
		payload: string,
		hashed: string,
	): Promise<boolean> {
		return compare(payload, hashed)
	}
}
