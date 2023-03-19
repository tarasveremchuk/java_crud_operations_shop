package shop.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import shop.dto.product.ProductItemDTO;
import shop.entities.ProductEntity;

@Mapper(componentModel = "spring")
public interface ProductMapper {
    @Mapping(source = "category.name", target = "category")
    ProductItemDTO ProductItemDTOByProduct(ProductEntity product);

    @Mapping(target = "category",ignore = true)
    @Mapping(target = "dateCreated",ignore = true)

    ProductItemDTO ProductByProductCreateDTO(ProductCreateDTO product);
}