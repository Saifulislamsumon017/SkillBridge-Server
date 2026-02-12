/*
  Warnings:

  - The `status` column on the `bookings` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `reviews` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `tutor_profiles` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "BOOKING_STATUS" AS ENUM ('PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "REVIEW_STATUS" AS ENUM ('APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "TUTOR_STATUS" AS ENUM ('ACTIVE', 'INACTIVE');

-- AlterTable
ALTER TABLE "bookings" DROP COLUMN "status",
ADD COLUMN     "status" "BOOKING_STATUS" NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "reviews" DROP COLUMN "status",
ADD COLUMN     "status" "REVIEW_STATUS" NOT NULL DEFAULT 'APPROVED';

-- AlterTable
ALTER TABLE "tutor_profiles" DROP COLUMN "status",
ADD COLUMN     "status" "TUTOR_STATUS" NOT NULL DEFAULT 'ACTIVE';

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "role" SET DEFAULT 'USER',
ALTER COLUMN "status" SET DEFAULT 'ACTIVE';

-- DropEnum
DROP TYPE "BookingStatus";

-- DropEnum
DROP TYPE "ReviewStatus";

-- DropEnum
DROP TYPE "TutorStatus";

-- CreateIndex
CREATE INDEX "bookings_status_idx" ON "bookings"("status");

-- CreateIndex
CREATE INDEX "tutor_profiles_status_idx" ON "tutor_profiles"("status");
