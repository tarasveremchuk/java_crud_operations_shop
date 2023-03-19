package shop.services;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import shop.dto.category.CategoryCreateDTO;
import shop.dto.category.CategoryItemDTO;
import shop.dto.category.CategoryUpdateDTO;
import shop.entities.CategoryEntity;
import shop.iterfaces.CategoryService;
import shop.mapper.CategoryMapper;
import shop.repositories.CategoryRepository;
import shop.storage.StorageService;

import java.util.List;

@Service
@AllArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;
    private final CategoryMapper categoryMapper;
    private final StorageService storageService;
    @Override
    public CategoryItemDTO create(CategoryCreateDTO model) {
        var fileName = storageService.saveMultipartFile(model.getFile()); //storageService.save(model.getBase64());
        CategoryEntity category = categoryMapper.CategoryByCreateCategoryDTO(model);
        category.setImage(fileName);
        categoryRepository.save(category);
        var result = categoryMapper.CategoryItemByCategory(category);
        return result;
    }

    @Override
    public List<CategoryItemDTO> get() {
        var list =categoryRepository.findAll();
        return categoryMapper.CategoryItemsByCategories(list);
    }

    @Override
    public CategoryItemDTO update(int id, CategoryUpdateDTO model) {
        var catOptional = categoryRepository.findById(id);
        if(catOptional.isPresent())
        {
            var cat = catOptional.get();
            if(model.getFile()!=null) {
                storageService.removeFile(cat.getImage());
                var image = storageService.saveMultipartFile(model.getFile());
                cat.setImage(image);
            }
            cat.setName(model.getName());
            cat.setDescription(model.getDescription());
            categoryRepository.save(cat);
            var result = categoryMapper.CategoryItemByCategory(cat);
            return result;
        }
        return null;
    }

    @Override
    public void delete(int id) {
        var cat = categoryRepository.findById(id).get();
        storageService.removeFile(cat.getImage());
        categoryRepository.deleteById(id);
    }

    @Override
    public CategoryItemDTO get(int id) {
        var catOptional = categoryRepository.findById(id);
        if(catOptional.isPresent())
        {
            return categoryMapper.CategoryItemByCategory(catOptional.get());
        }
        return null;
    }
}
