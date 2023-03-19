package shop.mapper;

import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;
import shop.dto.category.CategoryCreateDTO;
import shop.dto.category.CategoryItemDTO;
import shop.entities.CategoryEntity;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-02-26T12:26:23+0200",
    comments = "version: 1.5.3.Final, compiler: javac, environment: Java 19.0.2 (Oracle Corporation)"
)
@Component
public class CategoryMapperImpl implements CategoryMapper {

    @Override
    public CategoryItemDTO CategoryItemByCategory(CategoryEntity category) {
        if ( category == null ) {
            return null;
        }

        CategoryItemDTO categoryItemDTO = new CategoryItemDTO();

        categoryItemDTO.setId( category.getId() );
        categoryItemDTO.setName( category.getName() );
        categoryItemDTO.setDescription( category.getDescription() );
        categoryItemDTO.setImage( category.getImage() );

        return categoryItemDTO;
    }

    @Override
    public List<CategoryItemDTO> CategoryItemsByCategories(List<CategoryEntity> categories) {
        if ( categories == null ) {
            return null;
        }

        List<CategoryItemDTO> list = new ArrayList<CategoryItemDTO>( categories.size() );
        for ( CategoryEntity categoryEntity : categories ) {
            list.add( CategoryItemByCategory( categoryEntity ) );
        }

        return list;
    }

    @Override
    public CategoryEntity CategoryByCreateCategoryDTO(CategoryCreateDTO dto) {
        if ( dto == null ) {
            return null;
        }

        CategoryEntity categoryEntity = new CategoryEntity();

        categoryEntity.setName( dto.getName() );
        categoryEntity.setDescription( dto.getDescription() );

        return categoryEntity;
    }
}
