# LLDB Pretty Printers for Bun

This directory contains LLDB pretty printers for various Bun data structures to improve the debugging experience.

## Files

- `bun_pretty_printer.py` - Pretty printers for Bun-specific types
- `lldb_pretty_printers.py` - Pretty printers for Zig language types (from the Zig project)
- `lldb_webkit.py` - Pretty printers for WebKit/JavaScriptCore types
- `init.lldb` - LLDB initialization commands

## Supported Types

### bun.String Variants
- `bun.String` - Main Bun string type (tagged union)
- `WTFStringImpl` - WebKit string implementation (Latin1/UTF16)
- `ZigString` - Zig string type (UTF8/Latin1/UTF16 with pointer tagging)
- `StaticZigString` - Static/immortal strings
- Empty string (`""`)

### Display Examples

```
"Hello, World!" [latin1]          # Regular ZigString
"UTF-8 String 🎉" [utf8]          # UTF-8 encoded
"Static content" [latin1 static]  # Static string
"WebKit String"                   # WTFStringImpl
<dead>                            # Invalid/freed string
```

## Setup

### Option 1: Automatic (Recommended)
Add to your `~/.lldbinit`:
```lldb
command script import /path/to/bun/misctools/lldb/bun_pretty_printer.py
```

### Option 2: Per-Session
Load manually in LLDB:
```lldb
(lldb) command script import misctools/lldb/bun_pretty_printer.py
```

### Option 3: Using init.lldb
```lldb
(lldb) command source /path/to/bun/misctools/lldb/init.lldb
```

## Quick Start

1. Build a debug binary:
```bash
bun bd
```

2. Start debugging:
```bash
lldb ./build/debug/bun-debug
```

3. Load the pretty printers:
```lldb
(lldb) command script import misctools/lldb/bun_pretty_printer.py
```

4. Set a breakpoint and inspect:
```lldb
(lldb) frame variable
```

## Implementation Details

### ZigString Encoding (Pointer Tagging)

The upper bits encode metadata:
- **Bit 63**: 1 = UTF16, 0 = UTF8/Latin1
- **Bit 62**: 1 = Globally allocated (mimalloc)
- **Bit 61**: 1 = UTF8 encoding

### WTFStringImpl Encoding

Flag in `m_hashAndFlags`:
- **Bit 2** (`s_hashFlag8BitBuffer`): 1 = Latin1, 0 = UTF16

### bun.String Tag Union

- `0` - Dead (invalid/freed)
- `1` - WTFStringImpl
- `2` - ZigString
- `3` - StaticZigString
- `4` - Empty string

## Troubleshooting

**Pretty printers not showing?**

1. Verify Python is working:
```lldb
(lldb) script print("Python works")
```

2. Check if category is enabled:
```lldb
(lldb) type category list
(lldb) type category enable bun
```

3. Review exceptions by modifying the script to log errors instead of silently catching them.
