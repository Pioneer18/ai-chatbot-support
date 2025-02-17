import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class RedisService {
    constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) {}

    /**
     * **summary** use the key of a JWT to search the Redis 'dead-list' and check if the user is logged out
     * @param key the last 8 digits of a JWT used to list in the dead-list of the Redis cache
     */
    get = async (key: string): Promise<any> => {
        return await this.cache.get(key);
    }

    /**
     * **summary** syncGet is the synchronous version of the get method, used when async is not apporpriate
     * @param key the last 8 digits of a JWT used to list in the dead-list of the Redis cache 
     */
    syncGet = (key: string): Promise<any> => {
        return this.cache.get(key);
    }

    /**
     * **summary** this method is used to add a user's JWT to the logged out 'dead-list'
     * @param key the last 8 digits of a JWT
     * @param value the JWT
     */
    set = async (key: string, value: string): Promise<any> => {
        return await this.cache.set(key, value, null)
    }
}

