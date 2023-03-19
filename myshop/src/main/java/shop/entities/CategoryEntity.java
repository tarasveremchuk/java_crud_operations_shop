package shop.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
@Table(name="tbl_categories")
public class CategoryEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(nullable = false)
    private String name;
    private String image;
    @Column(length = 4000)
    private String description;
    @OneToMany(mappedBy = "category")
    private List<ProductEntity> products;

}
