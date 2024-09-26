import { serve } from "https://deno.land/std@0.203.0/http/server.ts";
import { ensureDir } from "https://deno.land/std@0.203.0/fs/mod.ts";

const UPLOAD_DIR = "uploads"; // Directory to save uploaded files

// Ensure the upload directory exists
await ensureDir(UPLOAD_DIR);

// Handle incoming requests
const handler = async (request: Request): Promise<Response> => {
  console.log('request');
  console.log(request);
  if (request.method === "POST") {
    try {
      const form = await request.formData();
      // console.log('formData', formData);
      
      // const form = await multiParser(request); // Parse the form data
      console.log('form');
      console.log(form);
      const file = form.get("file") as File;
      console.log('file' , file);

      if (!form || !file) {
        return new Response("No files were uploaded", { status: 400 });
      }

      let fileType: string = file.type.split("/")[0] ?? "";
      let fileExtension: string = file.name.split(".").pop() ?? "";
      let fileName: string = file.name.split(".")[0] ?? "";

      const filePath = UPLOAD_DIR + "/" + fileName + '.' + fileExtension;
      
      console.log('filePath' , filePath);

      const fileContent = new Uint8Array(await file.arrayBuffer());
      console.log('fileContent' , fileContent);
      await Deno.writeFile(filePath, fileContent);
      
      return new Response("Files uploaded successfully", { status: 200 });
    } catch (error) {
      console.error("File upload error:", error);
      return new Response("Failed to upload files", { status: 500 });
    }
  }

  // Return a method not allowed response for non-POST requests
  return new Response("Method Not Allowed", { status: 405 });
};

// Update the IP address to bind the server to your network IP
// const LOCAL_IP = "192.168.0.134"; // Replace this with your actual local IP address

// console.log(`HTTP webserver running. Access it at: http://${LOCAL_IP}:8000/`);
console.log(`HTTP webserver running. Access it at: http://localhost:8000/`);
await serve(handler, { port: 8000 });
