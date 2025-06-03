import type { Post } from '$generated/prisma';
import { isSlugUnique } from './post.server';

export type ErrorType = 'duplicate' | 'invalid';

export interface FieldError {
    type: ErrorType;
    message: string;
}

export interface ValidationResult {
    success: boolean;
    errorFields?: Record<string, FieldError>;
}

export const makeSlug = (title: string): string => {
    return title.toLowerCase().replace(/ /g, '-');
};

export const validatePostForm = async (data: Partial<Post>): Promise<ValidationResult> => {
    const errorFields: Record<string, FieldError> = {};

    Object.entries(data).forEach(([key, value]) => {
        if (!value) errorFields[key] = { type: 'invalid', message: '필수 항목입니다.' };
    });

    if (data.slug && !(await isSlugUnique(data.slug)))
        errorFields.slug = { type: 'duplicate', message: '이미 존재하는 슬러그입니다.' };

    return {
        success: Object.keys(errorFields).length === 0,
        errorFields
    };
};
