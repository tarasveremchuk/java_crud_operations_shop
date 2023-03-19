package shop.storage;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Path;

public interface StorageService {
    void init();
    Resource loadAsResource(String filename);
    String save(String base64);
    String saveMultipartFile(MultipartFile file);
    void removeFile(String name);
    Path load(String filename);
}
