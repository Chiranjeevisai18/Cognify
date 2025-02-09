/*
  # Create recordings table

  1. New Tables
    - `recordings`
      - `id` (uuid, primary key)
      - `created_at` (timestamp)
      - `audio_url` (text)
      - `raaga` (text)
      - `tempo` (integer)
      - `key` (text)
      - `user_id` (uuid, references auth.users)

  2. Security
    - Enable RLS on `recordings` table
    - Add policies for authenticated users to:
      - Read their own recordings
      - Create new recordings
*/

CREATE TABLE IF NOT EXISTS recordings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  audio_url text NOT NULL,
  raaga text NOT NULL,
  tempo integer NOT NULL,
  key text NOT NULL,
  user_id uuid REFERENCES auth.users NOT NULL
);

ALTER TABLE recordings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own recordings"
  ON recordings
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create recordings"
  ON recordings
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);