import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ICategoryCreate, ICategoryItem } from "../../home/types";
import { FaTrash } from "react-icons/fa";
const CategoryUpdatePage = () => {
  const navigator = useNavigate();
  const {id} = useParams();
  console.log("id", id);
const[category,setCategory]=useState<ICategoryItem | null>(null);
const[previewImage,setPreviewImage]=useState<string>("");
  const [model, setModel] = useState<ICategoryCreate>({
    name: "",
    description: "",
    file: null,
    image: ""
  });


  useEffect(() => {
    axios
      .get<Array<ICategoryItem>>(`http://localhost:8085/api/categories`)
      .then((resp) => {
        //console.log("resp = ", resp);
        setCategory(resp.data);
      });

      axios
      .get<IProductItem>(`http://localhost:8085/api/products/${id}`)
      .then((resp) => {
        const {files, name, price, category_id, description} = resp.data;
        setOldImages(files);
        setModel({...model, name, price, description, category_id});
        console.log("data", resp.data);
        
      });
    
  }, []);

  const content = categories.map((category) => (
    <option key={category.id} value={category.id}>{category.name}</option>
  ));

  const onChangeHandler = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    //console.log("input", e.target);
    setModel({ ...model, [e.target.name]: e.target.value });
  };

  const onChangeSelectHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    //console.log("input", e.target);
    //console.log("input", e.target.value);
    setModel({ ...model, [e.target.name]: e.target.value });
  };

  const onFileChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    //console.log("files", e.target.files);
    const { target } = e;
    if (target.files) {
      const file = target.files[0];
      setModel({ ...model, files: [...model.files, file] });
    }
  };
  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await axios.put(
        `http://localhost:8085/api/products/${id}`,
        model,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      navigator("/");
    } catch (e: any) {}
  };

  const filesContent = model.files.map((f, index) => (
    <img key={index} src={URL.createObjectURL(f)} />
  ));

  const DeleteProductOldImagesHandler = (imageSrc: string) => {
    setModel({...model, removeFiles: [...model.removeFiles, imageSrc]});
    setOldImages(oldImages.filter(x=>x!==imageSrc));
  };

  const DataProductsOld = oldImages.map((product, index) => (
    <div key={index} className="inline  m-2 ">
      <div
        style={{ cursor: "pointer" }}
        className="flex justify-center ... border-2 border-black  rounded-lg ... "
        onClick={(e) => {
          DeleteProductOldImagesHandler(product);
        }}
      >
        <FaTrash className="m-2 " />
      </div>
      <div className="p-2">
        <img
          className=" w-20 h-20 "
          src={`http://localhost:8085/files/600_${product}`}
        ></img>
      </div>
    </div>
  ));


  return (
    <div className="mx-auto max-w-7xl px-6">
      <h1 className="font-medium text-3xl">Зміна товару</h1>
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
              value={model.name}
              onChange={onChangeHandler}
              id="name"
              className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
              placeholder="Вкажіть назву"
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
              type="number"
              name="price"
              value={model.price}
              onChange={onChangeHandler}
              id="price"
              className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
              placeholder="Вкажіть ціна"
            />
          </div>

          <div>
            <label
              htmlFor="countries"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Оберіть категорію
            </label>
            <select
              value={model.category_id}
              onChange={onChangeSelectHandler}
              id="category_id"
              name="category_id"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option disabled>Виберіть категорію</option>
              {content}
            </select>
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
              value={model.description}
              onChange={onChangeHandler}
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
                {filesContent}
              </label>
              <label
                htmlFor="selectImage"
                className="ml-5 rounded-md border border-gray-300 bg-white 
                        py-2 px-3 text-sm font-medium leading-4 text-gray-700 
                        shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 
                        focus:ring-indigo-500 focus:ring-offset-2"
              >
                Додати фото
              </label>
            </div>

            <div className="mt-1 flex items-center">
              <label className="flex ">
                <>{DataProductsOld}</>
              </label>
            </div>
            <input
              type="file"
              onChange={onFileChangeHandler}
              id="selectImage"
              className="hidden"
            />
          </div>
        </div>
        <div className="space-x-4 mt-8">
          <button
            type="submit"
            className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 active:bg-blue-700 disabled:opacity-50"
          >
            Save
          </button>
          <button className="py-2 px-4 bg-white border border-gray-200 text-gray-600 rounded hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductUpdatePage;