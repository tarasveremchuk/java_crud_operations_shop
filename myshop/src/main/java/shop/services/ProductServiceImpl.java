package shop.services;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import shop.dto.product.ProductCreateDTO;
import shop.dto.product.ProductEditDTO;
import shop.dto.product.ProductItemDTO;
import shop.entities.CategoryEntity;
import shop.entities.ProductEntity;
import shop.entities.ProductImageEntity;
import shop.iterfaces.ProductService;
import shop.mapper.ProductMapper;
import shop.repositories.ProductImageRepository;
import shop.repositories.ProductRepository;
import shop.storage.StorageService;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@AllArgsConstructor
public class ProductServiceImpl implements ProductService {
    private final ProductRepository productRepository;
    private final ProductImageRepository productImageRepository;
    private final StorageService storageService;
    private final ProductMapper productMapper;
    @Override
    public ProductItemDTO create(ProductCreateDTO model) {
        var p = productMapper.ProductByProductCreateDTO(model);

        var cat = new CategoryEntity();
        cat.setId(model.getCategory_id());
        p.setDateCreated(new Date());
        p.setCategory(cat);
        p.setDelete(false);
        productRepository.save(p);
        int priority=1;
        for (var img : model.getFiles()) {
            var file = storageService.saveMultipartFile(img);
            ProductImageEntity pi = new ProductImageEntity();
            pi.setName(file);
            pi.setDateCreated(new Date());
            pi.setPriority(priority);
            pi.setDelete(false);
            pi.setProduct(p);
            productImageRepository.save(pi);
            priority++;
        }
        return null;
    }

    @Override
    public List<ProductItemDTO> get() {
        var products = productRepository.findAll();
        var result = new ArrayList<ProductItemDTO>();
        for (var p:products) {
            var item = productMapper.ProductItemDTOByProduct(p);
            for(var img : p.getProductImages())
                item.getFiles().add(img.getName());
            result.add(item);
        }
        return result;
    }


    @Override
    public ProductItemDTO getById(int id) {
        var productOptinal = productRepository.findById(id);
        if(productOptinal.isPresent())
        {
            var product = productOptinal.get();
            var data =  productMapper.ProductItemDTOByProduct(product);
            for(var img : product.getProductImages())
                data.getFiles().add(img.getName());
            return data;
        }
        return null;
    }
    @Override
    public ProductItemDTO edit(int id, ProductEditDTO model) {
        var p = productRepository.findById(id);
        //якщо по такому id - є продукт
        if(p.isPresent())
        {
            //отримуємо сам продукт
            var product = p.get();
            //Якщо користувач видадяв фото із списку - шукаємо фото по імені
            for (var name: model.getRemoveFiles()) {
                var pi = productImageRepository.findByName(name);
                if(pi!=null)
                {
                    productImageRepository.delete(pi); //видаляємо саме фото товару
                    storageService.removeFile(name); //видаляємо файли даного фото
                }
            }
            var cat = new CategoryEntity();
            cat.setId(model.getCategory_id()); //категорія товару, вказуємо для нього id
            product.setName(model.getName()); //змінуюємо імя товару
            product.setDescription(model.getDescription());//змінуюємо опис товару
            product.setPrice(model.getPrice());//змінуюємо ціну товару
            product.setCategory(cat); //змінуюємо категорію товару
            productRepository.save(product); //Зберігаємо дані про товар
            var productImages = product.getProductImages(); //Отримуємо список нових фото до товару
            int priority=1; //визначаємо пріорітет фото у послідовнссті
            for (var pi : productImages)
            {
                if(pi.getPriority()>priority) //шукаємо макисальний пріорітет
                    priority=pi.getPriority(); //нові фото ставимо у кінець черги.
            }
            priority++;
            ///Зберігаємо нові фото
            for (var img : model.getFiles()) {
                var file = storageService.saveMultipartFile(img);
                ProductImageEntity pi = new ProductImageEntity();
                pi.setName(file);
                pi.setDateCreated(new Date());
                pi.setPriority(priority);
                pi.setDelete(false);
                pi.setProduct(product);
                productImageRepository.save(pi);
                priority++;
            }
        }

        return null;
    }
    @Override
    public void delete(int id) {
        var product = productRepository.findById(id).get();
        for (var file :
                product.getProductImages()) {
            storageService.removeFile(file.getName());
        }
        productRepository.deleteById(id);
    }
}