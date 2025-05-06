package com.nextdoor.nextdoor.common;

import org.springframework.stereotype.Component;
import java.lang.annotation.*;

@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Component
public @interface PersistenceAdapter {
    String value() default "";
}
