# Xpander SDK Documentation

Welcome to the Xpander SDK documentation. This document will help you get started with using the SDK in various programming languages. Choose your preferred language below for quick start guides and further reading.

## Overview

Xpander SDK is a powerful tool that allows you to integrate advanced functionalities into your applications seamlessly. Below, you'll find the quick start guides for Python, Node.js, .NET, and Java.

## Language-Specific Quick Start Guides

### Python

```python
import xpander_sdk
client = xpander_sdk.XpanderClient(api_key="your_api_key", agent_url="agent_url")
client.do_something()
```

For more detailed information, visit the [Python API Reference](docs/python/api-reference).

### Node.js

```javascript
const { XpanderClient } = require('xpander-sdk');
const client = new XpanderClient('your_api_key', 'agent_url');
client.doSomething();
```

For more detailed information, visit the [Node.js API Reference](docs/nodejs/api-reference).

### .NET

```csharp
using XpanderSdk;
var client = new XpanderClient("your_api_key", "agent_url");
client.DoSomething();
```

For more detailed information, visit the [.NET API Reference](docs/dotnet/api-reference).

### Java

```java
import com.xpander.sdk.XpanderClient;
XpanderClient client = new XpanderClient("your_api_key", "agent_url");
client.doSomething();
```

For more detailed information, visit the [Java API Reference](docs/java/api-reference).

## Examples

Explore some examples to see how Xpander SDK can be integrated into your projects:

- [Python Examples](docs/python/examples)
- [Node.js Examples](docs/nodejs/examples)
- [.NET Examples](docs/dotnet/examples)
- [Java Examples](docs/java/examples)

## Further Reading

For more detailed information, please refer to the following:

- [Xpander SDK Overview](docs/overview)
- [API Reference](docs/api-reference)
- [Guides](docs/guides)
- [Troubleshooting](docs/troubleshooting)

## Contributing

We welcome contributions! Please refer to our [Contributing Guide](docs/contributing) for more information on how to get involved.

## License

This project is licensed under the terms of the MIT license. See the [LICENSE](LICENSE) file for details.

## Contact

For further questions or support, please contact us at [opensource@xpander.ai](mailto:opensource@xpander.ai).