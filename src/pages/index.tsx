import { useCallback, useState } from 'react';
import { useDropzone} from 'react-dropzone';

import Layout from '@/components/Layout';
import Container from '@/components/Container';
import FormRow from '@/components/FormRow';
import FormLabel from '@/components/FormLabel';
import InputText from '@/components/InputText';
import Button from '@/components/Button';


function Inscribe() {
  const onDrop = useCallback((acceptedFiles: Array<File>) => {
    const file = new FileReader;

    file.onload = function() {
      if(acceptedFiles.length>0)
      {
        setType(acceptedFiles[0].type);
      }
      setPreview(file.result);
    }

    file.readAsDataURL(acceptedFiles[0])
  }, [])

  const { acceptedFiles, getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop
  });

  const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);
  const [type,setType] = useState('');

  /**
   * handleOnSubmit
   */

  async function handleOnSubmit(e: React.SyntheticEvent) {
    e.preventDefault();

    if ( typeof acceptedFiles[0] === 'undefined' ) return;

    const formData = new FormData();
    const request = {
      "content": preview,
      "file_type": type,
      "fee_rate": 0,
      "destination": "string",
      "postage": 546,
      "batch": "string",
      "compress": true,
      "commit_fee_rate": 0,
      "cbor_metadata": "string",
      "json_metadata": "string",
      "metaprotocol": "string",
      "no_backup": true,
      "parent": "string",
      "reinscribe": true,
      "satpoint": 0,
      "sat": 0
    }
    
    formData.append('file', acceptedFiles[0]);
    formData.append('upload_preset', '<Your Upload Preset>');
    formData.append('api_key', import.meta.env.VITE_CLOUDINARY_API_KEY);
    console.log("This is the image",preview);
    const results = await fetch('https://api-dev.bitmap.community/api/v1/inscribe/create-inscription?api-key=<api_key>', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "accept":"accept: application/json"
      },
      body: JSON.stringify(request)
    }).then(r => r.json());

    console.log('results', results);
  }

  return (
    <Layout>

      <Container>
      <h1 className="text-6xl font-bold text-center text-orange-200 mb-20">
          Inscribe
        </h1>
        
        <form className="max-w-md border border-gray-200 rounded p-6 mx-auto" onSubmit={handleOnSubmit}>
          <FormRow className="mb-5">
            <FormLabel htmlFor="name">Address</FormLabel>
            <InputText id="name" name="name" type="text" />
          </FormRow>
          
          <FormRow className="mb-5">
            <FormLabel htmlFor="message">Text</FormLabel>
            <InputText id="message" name="message" type="text" />
          </FormRow>

          <FormRow className="mb-5">
            <FormLabel htmlFor="image">Image</FormLabel>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              {
                isDragActive ?
                  <p>Drop the files here ...</p> :
                  <p>Drag 'n' drop some files here, or click to select files</p>
              }
            </div>
          </FormRow>

          {preview && (
            <p className="mb-5">
              <img src={preview as string} alt="Upload preview" />
            </p>
          )}

          <Button>Submit</Button>
        </form>

      </Container>
    </Layout>
  )
}

export default Inscribe;
