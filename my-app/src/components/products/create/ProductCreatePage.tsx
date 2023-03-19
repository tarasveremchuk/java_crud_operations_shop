import axios from "axios";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IProductCreate } from "../types";

const ProductCreatePage = () => {
    const navigator = useNavigate();

    const [model, setModel] = useState<IProductCreate>({
        name: "",
        price: 0,
        category_id: 2,
        description: "",
        files: []
    });
    
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>| ChangeEvent<HTMLTextAreaElement>) => {
        //console.log(e.target.name, e.target.value);
        setModel({...model, [e.target.name]: e.target.value});
    }

    const onFileHandler = (e: ChangeEvent<HTMLInputElement>) => {
        //console.log("Select files: ", e.target.files);
        const {target} = e;
        const {files} = target;
        if(files) {
            const file = files[0];
            setModel({...model, files: [...model.files, file]});
        }
        target.value="";
    }

    const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const item = await axios
              .post(`http://localhost:8085/api/products`, 
                model, 
                {
                  headers: {
                    "Content-Type": "multipart/form-data"
                  }
                });
            console.log("Server save category", item);
            navigator("/");
        }catch(error: any) {
            console.log("Щось пішло не так", error);
        }
        
    }

    const dataFileView = model.files.map((file,index)=>
        <img key={index} src={URL.createObjectURL(file)}/>
    );

  return (
    <>
      <div className="p-8 rounded border border-gray-200">
        <h1 className="font-medium text-3xl">Додати товар</h1>

        <form onSubmit={onSubmitHandler}>
          <div className="mt-8 grid lg:grid-cols-1 gap-4">
            <div>
              <label
                htmlFor="name"
                className="text-sm text-gray-700 block mb-1 font-medium"
              >
                Назва
              </label>
              <input
                type="text"
                name="name"
                onChange={onChangeHandler}
                value={model.name}
                id="name"
                className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
                placeholder="Вкажіть назву товару"
              />
            </div>
            <div>
              <label
                htmlFor="price"
                className="text-sm text-gray-700 block mb-1 font-medium"
              >
                Ціна
              </label>
              <input
                type="text"
                name="price"
                onChange={onChangeHandler}
                value={model.price}
                id="price"
                className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
                placeholder="Вкажіть ціну"
              />
            </div>
            
            <div>
              <label
                htmlFor="category_id"
                className="text-sm text-gray-700 block mb-1 font-medium"
              >
                Категорія
              </label>
              <input
                type="text"
                name="category_id"
                onChange={onChangeHandler}
                value={model.category_id}
                id="category_id"
                className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
                placeholder="Вкажіть id категорії"
              />
            </div>
            

            <div>
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Опис
              </label>
              <textarea
                id="description"
                name="description"
                onChange={onChangeHandler}
                value={model.description}
                rows={4}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Вкажіть опис..."
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Фото
              </label>

              <div className="mt-1 flex items-center">
                <label
                  htmlFor="selectImage"
                  className="inline-block w-20 overflow-hidden bg-gray-100"
                >
                  {dataFileView}
                </label>
                <label
                  htmlFor="selectImage"
                  className="ml-5 rounded-md border border-gray-300 bg-white 
                        py-2 px-3 text-sm font-medium leading-4 text-gray-700 
                        shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 
                        focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Обрати фото
                </label>
              </div>

              <input
                type="file"
                id="selectImage"
                onChange={onFileHandler}
                className="hidden"
              />
            </div>
          </div>
          <div className="space-x-4 mt-8">
            <button
              type="submit"
              className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 active:bg-blue-700 disabled:opacity-50"
            >
              Додати
            </button>
            <Link
              to="/"
              className="py-2 px-4 bg-white border border-gray-200 text-gray-600 rounded hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50"
            >
              На головну
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default ProductCreatePage;