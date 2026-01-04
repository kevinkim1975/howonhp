import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';

// R2 클라이언트 설정
const r2Client = new S3Client({
  region: 'auto',
  endpoint: process.env.R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
  },
});

const BUCKET_NAME = process.env.R2_BUCKET_NAME || '';
const PUBLIC_URL = process.env.R2_PUBLIC_URL || '';

/**
 * 파일을 R2에 업로드
 * @param file - 업로드할 파일 (Buffer 또는 Uint8Array)
 * @param key - 저장될 파일 경로/이름 (예: 'images/photo.jpg')
 * @param contentType - 파일 MIME 타입 (예: 'image/jpeg')
 * @returns 업로드된 파일의 public URL
 */
export async function uploadFile(
  file: Buffer | Uint8Array,
  key: string,
  contentType: string
): Promise<string> {
  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
    Body: file,
    ContentType: contentType,
  });

  await r2Client.send(command);

  return getPublicUrl(key);
}

/**
 * R2에서 파일 삭제
 * @param key - 삭제할 파일 경로/이름
 */
export async function deleteFile(key: string): Promise<void> {
  const command = new DeleteObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
  });

  await r2Client.send(command);
}

/**
 * 파일의 public URL 생성
 * @param key - 파일 경로/이름
 * @returns public URL
 */
export function getPublicUrl(key: string): string {
  return `${PUBLIC_URL}/${key}`;
}

/**
 * 고유한 파일 키 생성
 * @param originalName - 원본 파일명
 * @param folder - 저장할 폴더 (예: 'portfolio', 'posts')
 * @returns 고유한 파일 키
 */
export function generateFileKey(originalName: string, folder: string): string {
  const timestamp = Date.now();
  const randomStr = Math.random().toString(36).substring(2, 8);
  const extension = originalName.split('.').pop()?.toLowerCase() || '';
  const safeName = originalName
    .replace(/\.[^/.]+$/, '')
    .replace(/[^a-zA-Z0-9가-힣]/g, '-')
    .substring(0, 50);

  return `${folder}/${timestamp}-${randomStr}-${safeName}.${extension}`;
}

/**
 * 허용된 이미지 타입 검사
 */
export function isValidImageType(contentType: string): boolean {
  const allowedTypes = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
    'image/svg+xml',
  ];
  return allowedTypes.includes(contentType);
}

/**
 * 파일 크기 검사 (기본 5MB)
 */
export function isValidFileSize(
  size: number,
  maxSizeMB: number = 5
): boolean {
  return size <= maxSizeMB * 1024 * 1024;
}
