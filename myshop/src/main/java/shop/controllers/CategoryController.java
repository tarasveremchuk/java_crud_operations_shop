package shop.controllers;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import shop.dto.category.CategoryCreateDTO;
import shop.dto.category.CategoryItemDTO;
import shop.dto.category.CategoryUpdateDTO;
import shop.entities.CategoryEntity;
import shop.iterfaces.CategoryService;
import shop.mapper.CategoryMapper;
import shop.repositories.CategoryRepository;
import shop.storage.StorageService;

import java.util.List;
import java.util.Optional;

@RestController
@AllArgsConstructor
@RequestMapping("api/categories")
public class CategoryController {
    private final CategoryService categoryService;

    @GetMapping
    public ResponseEntity<List<CategoryItemDTO>> index() {
        var model = categoryService.get();
        return new ResponseEntity<>(model, HttpStatus.OK);
    }
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<CategoryItemDTO> create(@ModelAttribute CategoryCreateDTO model) {
        var result = categoryService.create(model);
        return new ResponseEntity<>(result, HttpStatus.CREATED);
    }

    // build get user by id REST API
    // http://localhost:8085/api/categories/1
    @GetMapping("{id}")
    public ResponseEntity<CategoryItemDTO> getCategoryById(@PathVariable("id") Integer categoryId){
        return new ResponseEntity<>(categoryService.get(categoryId), HttpStatus.OK);
    }
    // Build Update User REST API
    @PutMapping(value = "{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    // http://localhost:8085/api/categories/1
    public ResponseEntity<CategoryItemDTO> updateCategory(@PathVariable("id") Integer categoryId,
                                           @ModelAttribute CategoryUpdateDTO model){
        var result = categoryService.update(categoryId, model);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    // Build Delete User REST API
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteCategory(@PathVariable("id") Integer categoryId){
        categoryService.delete(categoryId);
        return new ResponseEntity<>("Category successfully deleted!", HttpStatus.OK);
    }
}
