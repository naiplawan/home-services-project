import {Form, Upload } from 'antd'
// import supabase from '../../../server/utils/supabase';
import axios from 'axios';

function PhotoUploadingForm() {


    const onFinish = async (values) => {
        try {
          const { file } = values.upload[0].originFileObj; 
          
        //   const { error } = await supabase.storage
        const { error } = await axios.post("http://localhost:4000/service")
            .from('home_service') 
            .upload(file.name, file);
            
          if (error) {
            console.error('Error uploading file');
          } else {
            console.success('File uploaded successfully');
          }
        } catch (error) {
          console.error(error);
          console.error('Error uploading file');
        }
      };

    return (
        <>
        <h1> Photo Upload </h1>
        <Form onFinish={onFinish}> 
        <Form.Item label="Upload" name="upload" valuePropName="fileList" >
          <Upload 
          action="/upload.do" 
          listType="picture-card"
          beforeUpload={() => false} >
            <div>
              <div>Upload</div>
            </div>
          </Upload>
        </Form.Item>
        <Form.Item >
              <button  
              className="btn-primary w-[100%] mt-5 mb-5">
                Upload
              </button>
            </Form.Item>
            </Form>
        </>
       
    )
}

export default PhotoUploadingForm

