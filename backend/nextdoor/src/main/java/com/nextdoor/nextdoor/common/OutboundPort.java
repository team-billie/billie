package com.nextdoor.nextdoor.common;

import org.springframework.stereotype.Component;
import java.lang.annotation.*;

@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Component
public @interface OutboundPort {
    String value() default "";
}