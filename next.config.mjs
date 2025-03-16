/** @type {import('next').NextConfig} */
const nextConfig = {

        images: {
            remotePatterns: [
                {
                  protocol: "https",
                  hostname: "ferf1mheo22r9ira.public.blob.vercel-storage.com",
                  pathname: "/**", // Allows all images in the storage
                },
              ],
     
        },
      }


export default nextConfig;
