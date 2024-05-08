<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:tei="http://www.tei-c.org/ns/1.0" exclude-result-prefixes="tei">
    
    <!-- Output as text for CSV formatting -->
    <xsl:output method="text" encoding="UTF-8"/>

    <!-- Template to process the root element -->
    <xsl:template match="/tei:TEI">
        <!-- CSV Header -->
        <xsl:text>id,group,addressee&#10;</xsl:text>
        <!-- Apply templates to each hymn -->
        <xsl:apply-templates select=".//tei:div[@type='hymn']"/>
    </xsl:template>

    <!-- Template to process each hymn -->
    <xsl:template match="tei:div[@type='hymn']">
        <!-- Extract hymn id -->
        <xsl:variable name="id" select="@xml:id"/>
        <!-- Extract group -->
        <xsl:variable name="group" select="tei:div[@type='group']/tei:p[@xml:lang='eng']"/>
        <!-- Extract addressee -->
        <xsl:variable name="addressee" select="tei:div[@type='addressee']/tei:p[@xml:lang='eng']"/>

        <!-- Output CSV row -->
        <xsl:value-of select="$id"/>
        <xsl:text>,</xsl:text>
        <xsl:value-of select="$group"/>
        <xsl:text>,</xsl:text>
        <xsl:value-of select="$addressee"/>
        <xsl:text>&#10;</xsl:text>
    </xsl:template>

</xsl:stylesheet>
