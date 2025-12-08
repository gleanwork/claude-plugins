# Code Search Patterns Reference

Advanced patterns for searching internal code repositories.

## Language-Specific Patterns

### Go

**Find interface implementations:**
```
code_search "func (.*) [InterfaceName]"
code_search "implements [InterfaceName]"
```

**Find struct definitions:**
```
code_search "type [StructName] struct"
```

**Find error handling patterns:**
```
code_search "if err != nil"
code_search "errors.New"
```

### Python

**Find class definitions:**
```
code_search "class [ClassName]"
code_search "class [ClassName](BaseClass)"
```

**Find decorators usage:**
```
code_search "@[decorator_name]"
code_search "@app.route"
```

**Find imports:**
```
code_search "from [module] import"
```

### TypeScript/JavaScript

**Find React components:**
```
code_search "function [ComponentName]"
code_search "const [ComponentName] ="
code_search "export default [ComponentName]"
```

**Find hooks:**
```
code_search "const [hookName] = use"
code_search "useEffect"
code_search "useState"
```

**Find API calls:**
```
code_search "fetch("
code_search "axios."
```

### Java

**Find class definitions:**
```
code_search "public class [ClassName]"
code_search "extends [ParentClass]"
code_search "implements [Interface]"
```

**Find annotations:**
```
code_search "@[AnnotationName]"
code_search "@RestController"
code_search "@Service"
```

## Architecture Patterns

### Finding API Endpoints

**REST endpoints:**
```
code_search "@GetMapping"
code_search "@PostMapping"
code_search "app.get("
code_search "router.post"
```

**GraphQL:**
```
code_search "type Query"
code_search "type Mutation"
code_search "@Query"
```

### Finding Database Patterns

**Repository patterns:**
```
code_search "Repository"
code_search "interface.*Repository"
```

**Queries:**
```
code_search "SELECT.*FROM"
code_search ".find("
code_search ".query("
```

### Finding Configuration

**Environment config:**
```
code_search "process.env"
code_search "os.getenv"
code_search "config."
```

**Feature flags:**
```
code_search "featureFlag"
code_search "isEnabled("
code_search "flag:"
```

## Debugging Patterns

### Finding Error Handling

**Error definitions:**
```
code_search "class.*Error"
code_search "errors.New"
code_search "new Error("
```

**Error messages:**
```
code_search "\"[error message text]\""
```

### Finding Logging

**Log statements:**
```
code_search "log.error"
code_search "logger.warn"
code_search "console.error"
```

### Finding Tests

**Test files:**
```
code_search "[function name] test"
code_search "describe(\"[feature]\""
code_search "func Test[Name]"
```

## Ownership Investigation

### Finding Original Authors

**Recent changes by anyone:**
```
code_search "[component] updated:past_week"
```

**Specific author's work:**
```
code_search "owner:\"[author name]\" [component]"
```

### Finding Code Reviews

**PR-related comments (if indexed):**
```
code_search "[component] review"
```

## Migration Patterns

### Finding Deprecated Code

**Deprecation markers:**
```
code_search "@Deprecated"
code_search "// DEPRECATED"
code_search "# TODO: remove"
```

### Finding Migration Scripts

```
code_search "migration"
code_search "migrate"
code_search "upgrade"
```

## Performance Patterns

### Finding Caching

```
code_search "cache"
code_search "redis"
code_search "memcached"
code_search "@Cacheable"
```

### Finding Rate Limiting

```
code_search "rateLimit"
code_search "throttle"
code_search "rateLimiter"
```

## Security Patterns

### Finding Auth Implementations

```
code_search "authenticate"
code_search "authorize"
code_search "jwt"
code_search "OAuth"
```

### Finding Validation

```
code_search "validate"
code_search "sanitize"
code_search "@Valid"
```
