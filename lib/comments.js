import { db } from './db';

export async function createComment({ slug, user, message}) {
    return await db.comment.create({
        data: {
            slug: slug,
            user: user,
            message: message
        }
    });
}

export async function getComments(slug){
    return await db.comment.findMany({
        where: { slug },
    });
}