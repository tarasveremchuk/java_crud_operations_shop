package shop.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import shop.dto.category.CategoryCreateDTO;
import shop.dto.category.CategoryItemDTO;
import shop.entities.CategoryEntity;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CategoryMapper {
    CategoryItemDTO CategoryItemByCategory(CategoryEntity category);
    List<CategoryItemDTO> CategoryItemsByCategories(List<CategoryEntity> categories);
    @Mapping(target = "image", ignore = true)
    CategoryEntity CategoryByCreateCategoryDTO(CategoryCreateDTO dto);
}
